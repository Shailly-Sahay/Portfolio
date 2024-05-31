export class LazyLoadingView {
  _img = document.querySelectorAll("img[data-src");

  _lazyLoading() {
    // The cbf
    const cbf = function (entries, observer) {
      const [entry] = entries;
      console.log(entry);
      if (!entry.isIntersecting) return;

      // Replace
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener("load", function () {
        entry.target.classlist.remove("lazy-img");
      });

      observer.unobserve(entry.target);
    };

    // The one who observes
    const imgObserver = new IntersectionObserver(cbf, {
      root: null,
      threshold: 0,
    });

    // Asking the observer to observe
    this._img.forEach((img) => imgObserver.observe(img));
  }
}

export default new LazyLoadingView();
