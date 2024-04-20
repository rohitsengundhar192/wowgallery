const baseURL_2 = 'https://cephapi.getster.tech/api/';
const baseURL = 'https://u21api.getwow.education/api/';
const manageGetsterScreen = 'https://g19api.getster.tech/api/';
const cephProd = 'https://u5api.getwow.education/api/';

export const environment = {
  production: true,
  baseURL: '',
  getallusersnewinstutionalvidphotosedit:
  baseURL + 'cloud-file-storage/parent-student-linkage/get-student-list-edit',
  getallusersnewinstutionalvidphotos:
    baseURL + 'cloud-file-storage/parent-student-linkage/get-student-list',
  getloginuserdetails:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-login-user-details',

  getuploadeddatetime:
    baseURL + 'cloud-file-storage/parent-student-linkage/get-uploaded-datetime',
  gettaggeduserdetails:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-tagged-user-details',
  updateis_enabled_for_wow_screen_display:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-enable-disable-wow-screen',
  update_edit_ind_vid_phot:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-edit-industrial-phovid',
  delete_file:
    baseURL + 'cloud-file-storage/parent-student-linkage/delete-global-id',
  updatetrim_video:
    baseURL + 'cloud-file-storage/parent-student-linkage/update-trim-video',
  audit_trail:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-audit-trail-wowgallery-mamangement',
    getenablestatuscountdefault: baseURL + 'cloud-file-storage/parent-student-linkage/get-enable-status-count-default',

    getenablestatuscount: baseURL + 'cloud-file-storage/parent-student-linkage/get-enable-status-count',
  //used category
  insertinstitutionalphovid:
    baseURL + 'cloud-file-storage/parent-student-linkage/insert-ins-photo-vid',
  getuploadedimage:
    baseURL + 'cloud-file-storage/parent-student-linkage/get-uploaded-image',
  getalldatatableindusphovid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-indvidimg',
  //another
  updateenabledisablewowscreendefualtimgart:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-enable-disable-wow-screen-ins-art',
  updateenabledisablewowscreendefualtimgvid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-enable-disable-wow-screen-img-vid',
  updateenabledisablewowscreendefualttour:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-enable-disable-wow-screen-tour',
  //Wow Screen defualt images and videos
  getalltablewowscreendefualtimgvid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-table-wowscreen-defualt-imgvid',
  updateenabledisablewowscreendefualt:
    baseURL +
    'cloud-file-storage/parent-student-linkage/update-enable-disable-wow-screen-defualt',

  //instuditional art and image
  insertinstitutionalphovidinsart:
    baseURL +
    'cloud-file-storage/parent-student-linkage/insert-ins-photo-vid-art',
  getuploadedimageinsart:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-uploaded-image-art',
  getalldatatableindusphovidinsart:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-indvidimg-art',

  //Wow camp images and videos
  insertinstitutionalphovidimgvid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/insert-ins-photo-vid-imgvid',
  getuploadedimageimgvid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-indvidimg-imgvid',
  getalldatatableindusphovidimgvid:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-indvidimg-imgvid',

  //wow industrial tour video
  insertinstitutionalphovidindtour:
    baseURL +
    'cloud-file-storage/parent-student-linkage/insert-ins-photo-vid-indtour',
  getuploadedimageindtour:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-uploaded-image-indtour',
  getalldatatableindusphovidindtour:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-all-data-indvidimg-indtour',

  getalltable:
    baseURL +
    'cloud-file-storage/parent-student-linkage/get-ins-pho-vid-table-indtour',
  getdesc: baseURL + 'cloud-file-storage/parent-student-linkage/get-desc',
  getlaunch: baseURL + 'cloud-file-storage/parent-student-linkage/launch-screen-display',
  getalldatascreendefault: baseURL +'cloud-file-storage/parent-student-linkage/get-all-data-screen-default',
  cloudidpost:
  baseURL +
  'cloud-file-storage/parent-student-linkage/launch-screen-display-cloud-id-post',
getuploadedimagespost:
  baseURL + 'cloud-file-storage/parent-student-linkage/get-uploaded-image-post',
  // ------------------------------- CEPH Storage -----------------
  // create_file:
  //   'https://cephapi.getster.tech/api/storage-for-customers/create-file',
  create_file: cephProd + 'files-master/file-upload-throw-other-customer-apps',
  update_file: baseURL_2 + 'storage-for-customers/update-file',

  get_file: baseURL_2 + 'storage-for-customers/get-file',
  get_file_multiple_files_based_on_key:
    baseURL_2 + 'storage-for-customers/get-file-multiple-files-based-on-key',
  delete_file_ceph: baseURL_2 + 'storage-for-customers/delete-file',

  ceph_URL: 'https://ceph1.getwow.cloud/',
  get_file_multiple_files_based_on_key_manage:
    baseURL_2 +
    'storage-for-education-management/get-file-multiple-files-based-on-key',

  manageGetsterScreens:
    manageGetsterScreen +
    'default-getster-screen-images-videos/get-edu-customers-getster-screen-images-videos',
};
