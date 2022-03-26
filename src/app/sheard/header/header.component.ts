import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { toggleMenu } from '../../../assets/myjsfile.js';
import { AuthService } from '../auth/auth.service.js';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(private readonly auth: AuthService) {}
  ngAfterViewInit(): void {
    toggleMenu.toggleMethod();
  }

  ngOnInit(): void {}

  onLogout() {
    this.auth.logout();
  }
}
