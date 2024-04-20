import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaunchScreenAppRoutingModule } from './launch-screen-app-routing.module';
import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstutionalPhotosVideosComponent } from './Components/instutional-photos-videos/instutional-photos-videos.component';
import { InstitutionalArtImageComponent } from './Components/institutional-art-image/institutional-art-image.component';
import { WowcampImagesVideosComponent } from './Components/wowcamp-images-videos/wowcamp-images-videos.component';
import { WowindustrialTourImagesVideosComponent } from './Components/wowindustrial-tour-images-videos/wowindustrial-tour-images-videos.component';
import { WowscreenDefualtImagesVideosComponent } from './Components/wowscreen-defualt-images-videos/wowscreen-defualt-images-videos.component';
import { GetlargeImageComponent } from './Helper-Component/getlarge-image/getlarge-image.component';
import { AddNewInsVideoPhotoComponent } from './Helper-Component/add-new-ins-video-photo/add-new-ins-video-photo.component';
import { WowindustrialTourIamgesPopupComponent } from './Helper-Component/wowindustrial-tour-iamges-popup/wowindustrial-tour-iamges-popup.component';
import { InstitutionalArtImagePopupComponent } from './Helper-Component/institutional-art-image-popup/institutional-art-image-popup.component';
import { WowcampImagesVideosPopupComponent } from './Helper-Component/wowcamp-images-videos-popup/wowcamp-images-videos-popup.component';
import { TrimVideoPopupComponent } from './Helper-Component/trim-video-popup/trim-video-popup.component';
import { TestingComponent } from './Components/testing/testing.component';
import { EditAddNewInsVideoPopupComponent } from './Edit-component/edit-add-new-ins-video-popup/edit-add-new-ins-video-popup.component';
import { AuditTrailComponent } from './Components/audit-trail/audit-trail.component';
import { AuditTrailDialogComponent } from 'src/app/shared/dialogs/audit-trail-dialog/audit-trail-dialog.component';
import { AddInsArtImageComponent } from './Components/institutional-art-image/add-ins-art-image/add-ins-art-image.component';
import { EditInsArtImageComponent } from './Components/institutional-art-image/edit-ins-art-image/edit-ins-art-image.component';
import { TrimInsArtImageComponent } from './Components/institutional-art-image/trim-ins-art-image/trim-ins-art-image.component';
import { AddWowcampImagesVideosComponent } from './Components/wowcamp-images-videos/add-wowcamp-images-videos/add-wowcamp-images-videos.component';
import { EditWowcampImagesVideosComponent } from './Components/wowcamp-images-videos/edit-wowcamp-images-videos/edit-wowcamp-images-videos.component';
import { TrimWowcampImagesVideosComponent } from './Components/wowcamp-images-videos/trim-wowcamp-images-videos/trim-wowcamp-images-videos.component';
import { AddWowindTourComponent } from './Components/wowindustrial-tour-images-videos/add-wowind-tour/add-wowind-tour.component';
import { EditWowindTourComponent } from './Components/wowindustrial-tour-images-videos/edit-wowind-tour/edit-wowind-tour.component';

@NgModule({
  declarations: [
    LaunchScreenAppComponent,
    InstutionalPhotosVideosComponent,
    InstitutionalArtImageComponent,
    WowcampImagesVideosComponent,
    WowindustrialTourImagesVideosComponent,
    WowscreenDefualtImagesVideosComponent,
    GetlargeImageComponent,
    AddNewInsVideoPhotoComponent,
    WowindustrialTourIamgesPopupComponent,
    InstitutionalArtImagePopupComponent,
    WowcampImagesVideosPopupComponent,
    TrimVideoPopupComponent,
    TestingComponent,
    EditAddNewInsVideoPopupComponent,
    AuditTrailComponent,
    AuditTrailDialogComponent,
    AddInsArtImageComponent,
    EditInsArtImageComponent,
    TrimInsArtImageComponent,
    AddWowcampImagesVideosComponent,
    EditWowcampImagesVideosComponent,
    TrimWowcampImagesVideosComponent,
    AddWowindTourComponent,
    EditWowindTourComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    LaunchScreenAppRoutingModule,

  ]
})
export class LaunchScreenAppModule { }
