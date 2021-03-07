import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {TodoService} from '../todo/todo.service';

@NgModule({
  imports:      [ HttpClientModule ],
  providers: [TodoService]
})
export class SharedModule { }