import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-students-private',
  templateUrl: './students-private.component.html',
  styleUrls: ['./students-private.component.css']
})
export class StudentsPrivateComponent {

  student: any
  coments: any
  constructor(private teachersService: TeachersService, private activatedRoute: ActivatedRoute) {
    this.student = {};
    this.coments = [];
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      this.student = await this.teachersService.getById(+params['teacherId'])

      this.coments = await this.teachersService.getComents(+params['teacherId'])

    })
  }
}
