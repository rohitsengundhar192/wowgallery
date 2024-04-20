import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private Audit_trail = new BehaviorSubject<string|any>(undefined);
  audit_trail_data = this.Audit_trail.asObservable();

  updateAuditTrailData(data: string) {
    this.Audit_trail.next(data);
  }


  private Assigned_category = new BehaviorSubject<any>(undefined);
  assigned_category_data = this.Assigned_category.asObservable();

  updateAssignedCategoryData(data: any) {
    this.Assigned_category.next(data);
  }


  private rad_button_two = new BehaviorSubject<boolean>(true);
  rad_button_data_two = this.rad_button_two.asObservable();

  radioButtonFunctionTwo(data: any) {
    this.rad_button_two.next(data);
  }

  private disabled_data = new Subject<any>();
  disabled_data_data = this.disabled_data.asObservable();

  disabledData(data: any) {
    this.disabled_data.next(data);
  }


  private Change_image = new BehaviorSubject<any>(undefined);
  Change_image_Data = this.Change_image.asObservable();

  ChangeImage(data: any) {
    this.Change_image.next(data);
  }

  private Previous_Change_image = new BehaviorSubject<any>(undefined);
  Previous_Change_image_Data = this.Previous_Change_image.asObservable();

  ChangeImagePrevious(data: any) {
    this.Previous_Change_image.next(data);
  }


  private share_data_while_image_click = new BehaviorSubject<any>(undefined);
  share_data_while_image_click_Data = this.share_data_while_image_click.asObservable();

  shareDataWhileImage(data: any) {
    this.share_data_while_image_click.next(data);
  }
}
