// // style-manager.service.ts

// import { OverlayContainer } from '@angular/cdk/overlay';
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class StyleManager {
//   isDark = false;
//   localstorageDarkMode: any;
//   storedTheme: string|any = localStorage.getItem('dark');

//   constructor(private overlayContainer: OverlayContainer) {
//     if (this.storedTheme === 'true') {
//       const href = 'dark-theme.css';
//       getLinkElementForKey('dark-theme').setAttribute('href', href);
//       document.body.classList.add('dark-theme');
//       this.overlayContainer.getContainerElement().classList.add('dark-theme');
//       document.body.classList.add('dark-theme');
//       this.isDark = true;
//     } else if (this.storedTheme === 'false') {
//       this.removeStyle('dark-theme');
//       document.body.classList.remove('dark-theme');
//       this.overlayContainer
//         .getContainerElement()
//         .classList.remove('dark-theme');
//       this.isDark = false;
//     }
//   }

//   toggleDarkTheme() {
//     if (this.isDark) {
//       this.removeStyle('dark-theme');
//       document.body.classList.remove('dark-theme');
//       this.overlayContainer
//         .getContainerElement()
//         .classList.remove('dark-theme');
//       this.isDark = false;
//     } else {
//       const href = 'dark-theme.css';
//       getLinkElementForKey('dark-theme').setAttribute('href', href);
//       document.body.classList.add('dark-theme');
//       this.overlayContainer.getContainerElement().classList.add('dark-theme');
//       this.isDark = true;
//     }
//   }

//   removeStyle(key: string) {
//     const existingLinkElement = getExistingLinkElementByKey(key);
//     if (existingLinkElement) {
//       document.head.removeChild(existingLinkElement);
//     }
//   }
// }

// function getLinkElementForKey(key: string) {
//   return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
// }

// function getExistingLinkElementByKey(key: string) {
//   return document.head.querySelector(
//     `link[rel="stylesheet"].${getClassNameForKey(key)}`
//   );
// }

// function createLinkElementWithKey(key: string) {
//   const linkEl = document.createElement('link');
//   linkEl.setAttribute('rel', 'stylesheet');
//   linkEl.classList.add(getClassNameForKey(key));
//   document.head.appendChild(linkEl);
//   return linkEl;
// }

// function getClassNameForKey(key: string) {
//   return `style-manager-${key}`;
// }
import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StyleManager {
  // isDark = false;
  // localstorageDarkMode: any;
  // storedTheme: string|any = localStorage.getItem('dark');

  constructor(private overlayContainer: OverlayContainer) {
    // if (this.storedTheme === 'true') {
    //   const href = 'dark-theme.css';
    //   getLinkElementForKey('dark-theme').setAttribute('href', href);
    //   document.body.classList.add('dark-theme');
    //   this.overlayContainer.getContainerElement().classList.add('dark-theme');
    //   document.body.classList.add('dark-theme');
    //   this.isDark = true;
    // } else if (this.storedTheme === 'false') {
    //   this.removeStyle('dark-theme');
    //   document.body.classList.remove('dark-theme');
    //   this.overlayContainer
    //     .getContainerElement()
    //     .classList.remove('dark-theme');
    //   this.isDark = false;
    // }
  }

  toggleDarkTheme(is_dark: boolean) {
    if (!is_dark) {
      this.removeStyle('dark-theme');
      document.body.classList.remove('dark-theme');
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
      // isDark = false;
    } else {
      const href = 'dark-theme.css';
      getLinkElementForKey('dark-theme').setAttribute('href', href);
      document.body.classList.add('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      // isDark = true;
    }
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
