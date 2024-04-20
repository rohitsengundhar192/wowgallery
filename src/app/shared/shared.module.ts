import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { LoginComponent } from './dialogs/login/login.component';
import { NoInternetComponent } from './dialogs/no-internet/no-internet.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes/unsaved-changes.guard';
import { MaterialModule } from './material.module';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize/no-sanitize.pipe';
import { SpinnerComponent } from './services/custom-spinner/spinner.component';
import { AddAllToPaginator } from './directives/add-all-to-paginator/add-all-to-paginator.directive';
import { prevDirective } from './directives/add-all-to-paginator/next-previous/pervioud.directive';
import { nextDirective } from './directives/add-all-to-paginator/next-previous/next.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { TimeFormatPipe } from './pipes/time-format/time-format.pipe';
import { DeleteConfirmDialogComponent } from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { SimpleTimeFormat } from './pipes/time-format/simple-time.pipe';
import { UserProfileCardComponent } from './dialogs/user-profile-card/user-profile-card.component';
import { firstLine } from './pipes/time-format/firstline-format.pipe';
import { SecondLine } from './pipes/time-format/secondline-format.pipe';
import { FilterPipetable } from './pipes/searchfiltertable/tablefilter.pipe';

const BASE_MODULES = [FormsModule, ReactiveFormsModule, MaterialModule];

const Guards = [UnsavedChangesGuard];

const Pipes = [
  EllipsisPipe,
  NoSanitizePipe,
  FilterPipe,
  TimeFormatPipe,
  SimpleTimeFormat,
  firstLine,
  SecondLine,
];

const Directives: any[] = [AddAllToPaginator, prevDirective, nextDirective];

@NgModule({
  declarations: [
    Pipes,
    Directives,
    LoginComponent,
    SpinnerComponent,
    NoInternetComponent,
    DeleteConfirmDialogComponent,
    UserProfileCardComponent,
    FilterPipetable,
    DeleteConfirmDialogComponent,
  ],
  imports: [CommonModule, RouterModule, BASE_MODULES],
  providers: [Guards],
  exports: [Pipes, Directives, BASE_MODULES],
})
export class SharedModule {}
