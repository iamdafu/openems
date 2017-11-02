import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments';
import { Service, Websocket } from './shared/shared';

@Component({
  selector: 'root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  public env = environment;

  private navCollapsed: boolean = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public websocket: Websocket,
    private service: Service,
    private snackBar: MatSnackBar
  ) {
    service.setLang('de');
  }

  ngOnInit() {
    this.service.notificationEvent.takeUntil(this.ngUnsubscribe).subscribe(notification => {
      this.snackBar.open(notification.message, null, { duration: 3000 });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

