if("serviceWorker" in navigator) {
  navigator.serviceWorker
      .register("./sw.js", {scope: "./"})
      .then(registration => {
          console.log("service worker registered");
      }).catch(err => {
          console.log("failed to register", err);
      })
}
