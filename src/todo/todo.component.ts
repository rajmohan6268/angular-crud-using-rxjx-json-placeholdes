import { Component } from "@angular/core";
import { TodoService } from "./todo.service";

@Component({
  selector: "todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
})
export class TodoComponent {
  todos = null;
  todo = null;
  showAdd = false;
  message: "";

  constructor(private todoService: TodoService) {}

  openTodo(todo) {
    this.todoService.getTodoData(todo.id).subscribe(data => {
      this.todo = data.body;
    });
  }

  add() {
    this.showAdd = true;
    this.todo = {};
    this.message = "";
  }

  save() {
    const api = this.todo.id
      ? this.todoService.putTodoData(this.todo)
      : this.todoService.postTodoData(this.todo);

    api.subscribe(x => {
      this.message = !this.todo.id
        ? "Todo created successfully"
        : `Todo ${this.todo.id} saved successfully`;
      this.todo = null;
      this.todos = null;
      this.showAdd = false;
    });
  }

  delete() {
    this.todoService.deleteTodoData(this.todo.id).subscribe(x => {
      this.message = `Todo ${this.todo.id} deleted successfully`;
      this.todo = null;
      this.todos = null;
      this.showAdd = false;
    });
  }

  getData() {
    this.message = "";
    this.todoService.getTodos().subscribe(
      data => (this.todos = data),
      error => console.log("Test error", error));
  }

  back() {
    this.todo = null;
    this.showAdd = false;
    this.todos = null;
  }
}
