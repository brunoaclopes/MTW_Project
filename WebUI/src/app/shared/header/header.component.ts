import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  @Output() sidebarToggle = new EventEmitter<any>();
  @Input() sidebarState !:  MatSidenav;

  constructor() {
  }

  ngOnInit() {
  }

  onToggleSidebar(){
    this.sidebarToggle.emit()
  }
}
