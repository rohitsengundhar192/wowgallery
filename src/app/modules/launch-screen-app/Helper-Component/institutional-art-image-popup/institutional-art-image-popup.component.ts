import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-institutional-art-image-popup',
  templateUrl: './institutional-art-image-popup.component.html',
  styleUrls: ['./institutional-art-image-popup.component.scss']
})
export class InstitutionalArtImagePopupComponent implements OnInit  {
  //* --------------------------  Start  -----------------------------------*//
  firstFormGroup = this._formBuilder.group({
    categoryforms: ['', Validators.required],
  });

  get categoryforms() {
    return this.firstFormGroup.get('categoryforms');
  }
  //* -----------------------  Decorated Methods  --------------------------*//
  foods: Food[] = [
    { value: 'steak-0', viewValue: '2022-23' },
    { value: 'pizza-1', viewValue: '2023-24' },
    { value: 'tacos-2', viewValue: '2024-25' },
  ];
  //* -----------------------  Variable Declaration  -----------------------*//
  searchContact: any;
  contact_list: any;
  searchText!: string;
  volunteerID: any;
  listofUserId: string[] = [];
  //* ---------------------------  Constructor  ----------------------------*//
  constructor(
    public loginDialogRef: MatDialogRef<InstitutionalArtImagePopupComponent>,
    private _snackbar: SnackBarService,
    private api_service: ApiService,
    private _formBuilder: FormBuilder,
    private _dataShare: DataSharingService,
    private _apiservice:ApiService,

    public MatDialogRef: MatDialogRef<InstitutionalArtImagePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //* -------------------------  Lifecycle Hooks  --------------------------*//
  ngOnInit(): void {
    // this.getstudent();
  }

  //* ----------------------------  APIs Methods  --------------------------*//
  check_add_user(data: any) {
    this.volunteerID = data.user_id;
  }

  //* --------------------------  Public methods  --------------------------*//

  //* ------------------------------ Helper Function -----------------------*//
  onNoClick(): void {
    this.loginDialogRef.close();
  }
  addUserToGroup(userId: any) {
    if (this.listofUserId.length == 0) {
      this.listofUserId.push(userId.user_id);
    } else {
      const isExist = this.listofUserId.includes(userId.user_id);
      if (isExist == true) {
        let index = this.listofUserId.indexOf(userId.user_id);
        this.listofUserId.splice(index, 1);
      } else {
        this.listofUserId.push(userId.user_id);
      }
    }
  }
  //! -------------------------------  End  --------------------------------!//
}

