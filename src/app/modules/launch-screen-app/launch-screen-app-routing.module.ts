import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaunchScreenAppComponent } from './launch-screen-app/launch-screen-app.component';
import { InstutionalPhotosVideosComponent } from './Components/instutional-photos-videos/instutional-photos-videos.component';
import { InstitutionalArtImageComponent } from './Components/institutional-art-image/institutional-art-image.component';
import { WowcampImagesVideosComponent } from './Components/wowcamp-images-videos/wowcamp-images-videos.component';
import { WowindustrialTourImagesVideosComponent } from './Components/wowindustrial-tour-images-videos/wowindustrial-tour-images-videos.component';
import { WowscreenDefualtImagesVideosComponent } from './Components/wowscreen-defualt-images-videos/wowscreen-defualt-images-videos.component';
import { TestingComponent } from './Components/testing/testing.component';
import { WowindustrialTourIamgesPopupComponent } from './Helper-Component/wowindustrial-tour-iamges-popup/wowindustrial-tour-iamges-popup.component';

const routes: Routes = [
  { path: '', redirectTo: 'launch-screen', pathMatch: 'full' },
  {
    path: 'launch-screen',
    component: LaunchScreenAppComponent,
    children: [
      {
        path: '',
        redirectTo: 'instutional-photos-videos',
        pathMatch: 'full',
      },
      {
        path: 'instutional-photos-videos',
        component: InstutionalPhotosVideosComponent,
      },
      // {
      //   path: 'institutional-art-image',
      //   component: InstitutionalArtImageComponent,
      // },
      {
        path: 'wowcamp-images-videos',
        component: WowcampImagesVideosComponent,
      },
      {
        path: 'wowindustrial-tour-images-videos',
        component: WowindustrialTourImagesVideosComponent,
      },
      {
        path: 'wowscreen-defualt-images-videos',
        component: WowscreenDefualtImagesVideosComponent,
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchScreenAppRoutingModule {}
