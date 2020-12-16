import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question } from './../model/question';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // tslint:disable:no-inferrable-types
  pageload: number = 0;
  email: string = '';
  score: number = 0;
  questionArray: Question[];
  selectedOption: string = '';
  constructor(
    private router: ActivatedRoute,
    private questionService: QuestionService,
    private userService: UserService
  ) {
      this.questionService.getQuestion().subscribe(
        result => {
          this.questionArray = result;
          // console.log(this.questionArray);
      });
    }

  ngOnInit(): void {
  }
  radioChangeHandler(event: any): void{
    this.selectedOption = event.target.value;
    console.log(typeof(this.selectedOption));
  }
  next(): void {
      const { pageload, questionArray, selectedOption } = this;
      if (selectedOption !== '') {
        if (pageload <= questionArray.length) {
          this.pageload++;
          const index = questionArray[pageload].options.findIndex(str => str === selectedOption);
          if (index === questionArray[pageload].correct){
            this.score += 10;
          }
          this.selectedOption = '';
        } else {
          alert('Exam Completed');
        }
      } else {
        alert('Please Select an option');
      }
  }
  skip(): void {
    if (this.pageload === this.questionArray.length) {
      this.pageload++;
    } else {
      alert('No more Questions left to skip');
    }
  }

}
