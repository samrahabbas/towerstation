import { readAsArrayBuffer } from './asyncReader.js';
import { fetchFont, getAsset } from './prepareAssets';
import { noop } from './helper.js';
import {encode, decode} from 'uint8-to-base64';

export async function save(pdfFile, objects, name) {
  const PDFLib = await getAsset('PDFLib');
  const download = await getAsset('download');
  const makeTextPDF = await getAsset('makeTextPDF');
  let pdfDoc;
  try {
    pdfDoc = await PDFLib.PDFDocument.load(await readAsArrayBuffer(pdfFile));
  } catch (e) {
    console.log('Failed to load PDF.');
    throw e;
  }
  const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
    const pageObjects = objects[pageIndex];
    // 'y' starts from bottom in PDFLib, use this to calculate y
    const pageHeight = page.getHeight();
    const embedProcesses = pageObjects.map(async (object) => {
      if (object.type === 'image') {
        let { file, x, y, width, height } = object;
        localStorage.setItem("image",true);
        let img;
        try {
          if (file.type === 'image/jpeg') {
            img = await pdfDoc.embedJpg(await readAsArrayBuffer(file));
          } else {
            img = await pdfDoc.embedPng(await readAsArrayBuffer(file));
          }
          return () =>
            page.drawImage(img, {
              x,
              y: pageHeight - y - height,
              width,
              height,
            });
        } catch (e) {
          console.log('Failed to embed image.', e);
          return noop;
        }
      } else if (object.type === 'text') {
        let { x, y, lines, lineHeight, size, fontFamily, width } = object;
        const height = size * lineHeight * lines.length;
        localStorage.setItem("text",true);
        const font = await fetchFont(fontFamily);
        const [textPage] = await pdfDoc.embedPdf(
          await makeTextPDF({
            lines,
            fontSize: size,
            lineHeight,
            width,
            height,
            font: font.buffer || fontFamily, // built-in font family
            dy: font.correction(size, lineHeight),
          }),
        );
        return () =>
          page.drawPage(textPage, {
            width,
            height,
            x,
            y: pageHeight - y - height,
          });
      } else if (object.type === 'drawing') {
        localStorage.setItem("drawing",true);
        let { x, y, path, scale } = object;
        const {
          pushGraphicsState,
          setLineCap,
          popGraphicsState,
          setLineJoin,
          LineCapStyle,
          LineJoinStyle,
        } = PDFLib;
        return () => {
          page.pushOperators(
            pushGraphicsState(),
            setLineCap(LineCapStyle.Round),
            setLineJoin(LineJoinStyle.Round),
          );
          page.drawSvgPath(path, {
            borderWidth: 5,
            scale,
            x,
            y: pageHeight - y,
          });
          page.pushOperators(popGraphicsState());
        };
      }
    });
    // embed objects in order
    const drawProcesses = await Promise.all(embedProcesses);
    drawProcesses.forEach((p) => p());
  });
  await Promise.all(pagesProcesses);
  try {
    const pdfBytes = await pdfDoc.save();
    const formData = new FormData();
    const utf8Binary = new Uint8Array(pdfBytes);
    const encoded = encode(utf8Binary);
    let drawingD = localStorage.getItem("drawing");
    let imageD = localStorage.getItem("image");
    let textD = localStorage.getItem("text");
    let userId = localStorage.getItem("userId");
    let docId = localStorage.getItem("docId");
    let apiUrl = localStorage.getItem("apiUrl");
    let redirectUrl = localStorage.getItem("redirectUrl");
    formData.append('data', encoded);
    formData.append('drawingD', drawingD);
    formData.append('imageD', imageD);
    formData.append('textD', textD);
    formData.append('userId', userId);
    formData.append('docId', docId);
    if(drawingD == "true" || imageD == "true" || textD == "true"){
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location.href = `${redirectUrl}/dashboard`;
            }
        };

        xhr.open('post',`${apiUrl}/signed-documents/savePdf`, true);
        xhr.send(formData);
        localStorage.setItem("drawing",false);
        localStorage.setItem("image",false);
        localStorage.setItem("text",false);
        localStorage.setItem("userId",undefined);
        localStorage.setItem("docId",undefined);
    }else{
      alert("Please Add your signature");
    }
   

    
  } catch (e) {
    console.log('Failed to save PDF.');
    throw e;
  }
}
