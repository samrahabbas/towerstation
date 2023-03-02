import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, AfterViewInit {

  public isLoading: boolean = false;
  public selectedType:any;
  public text = false;
  public email = false;
  public number = false;
  public radio = false;
  public textArea = false;
  // questionsForm = FormGroup;
  public questionsForm: FormGroup;
  public optionsArray = new FormArray([new FormControl('', Validators.required)]);
  public tempQuestion: any = {question:"", text:false, email:false, number: false, radio: false, textArea: false};
  public questions:any = [] // id, question, answer
  public questionCount:any = [1];
  public radioOptions:any = [];

  public types: string[] = [
    'Text',
    'Email',
    'Number',
    'Radio',
    'Text-area',
  ]

  constructor(private fb: FormBuilder) { }
  ngAfterViewInit(): void {
    this.callEvents();
  }

  ngOnInit(): void {
    // console.log(this.selectedType);

    // this.questionsForm = this.fb.group({
    //   question: [null, []],
    //   radioOptions: this.fb.array([])
      
    // })

    // addTerminalGroup = new FormGroup({
    // terminalNameInput : this.terminalNameInput,
    // devices : this.devices,
// });

    console.log(this.questionsForm)



  }

  public onSubmitForm(){
    console.log(this.questionsForm);
  }

  // get getRadioOptions(){
  //   return this.questionsForm.get('radioOptions') as FormArray;
  // }

  public onAddRadio(){
    // this.getRadioOptions.push(this.fb.control(''))
    this.optionsArray.push(new FormControl('', Validators.required));
    this.radioOptions[this.radioOptions.length - 1].push(this.optionsArray.value[this.optionsArray.value.length - 2]);
  }
  getDeviceByIndex(index: number): FormControl {
    return this.optionsArray.at(index) as FormControl;
}

  public onRemoveRadio(index:any){
    this.optionsArray.removeAt(index);
  }
  

  public addOptions(){
    console.log(this.selectedType);
    if(this.selectedType == 'Text'){
      this.text = true;
    }
    if(this.selectedType == 'Email'){
      this.email = true;
    }
    if(this.selectedType == 'Number'){
      this.number = true;
    }
    if(this.selectedType == 'Radio'){
      this.radio = true;
      this.radioOptions.push([]);
    }
    if(this.selectedType == 'Text-area'){
      this.textArea = true;
    }

  }
  addQuestion() {
    this.questionCount.push(this.questionCount[this.questionCount.length - 1] + 1);
    $(".question-wrapper").append($("#sample-data").html());
    this.callEvents();
  }
  getValue() {
    this.questions = [];
    for(let question of this.questionCount) {
      let temp:any = {};
      temp.q = this.tempQuestion;
      temp.q.question = $(".question-" + question).find(".question-input").val()
      let tempType: any = $(".question-" + question).find(".question-type").val();
      if(tempType == "Text") {
        temp.q.text = true;
        temp.a = $(".question-" + question).find(".text-input").val();
      }
      else if(tempType == "Email") {
        temp.q.email = true;
      }
      else if(tempType == "Number") {
        temp.q.number = true;
      }
      else if(tempType == "Radio") {
        let tempRadio:any = this.radioOptions.shift();
        temp.q.radio = true;
        temp.radio = [];
        for(let a of tempRadio) {
          temp.radio.push(a);
        }

      }
      else if(tempType == "Text-area") {
        temp.q.textArea = true;
      }
      this.questions.push(temp);
    }
    console.log(this.questions);
  }
  callEvents() {
    $(".question-input").on("change", () => {
      alert();
    })
  }
}
