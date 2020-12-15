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
  questionArray: Question[];
  constructor(private router: ActivatedRoute, private questionService: QuestionService, private userService: UserService) {
    this.questionService.getQuestion().subscribe(
      result => {
        this.questionArray = result;
        // console.log(this.questionArray);
    });
  }

  ngOnInit(): void {
  }

  next(): void {
    const { pageload, questionArray } = this;
    if (pageload !== questionArray.length) {
      this.pageload++;
    } else {
      alert('Exam Completed');
    }
  }
  skip(): void {
    this.pageload++;
  }

}
