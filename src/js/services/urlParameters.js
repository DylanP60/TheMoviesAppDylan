// Parameters de l'url
export default class UrlParameters {
  static Url() {
    return new URL(window.location.href);
  }

  static UrlParamSearchByName() {
    return this.Url().searchParams.get('searchName');
  }

  static UrlParamSearchByYear() {
    return this.Url().searchParams.get('searchYear');
  }

  static UrlParamSearchByGenre() {
    const params = this.Url().search;

    if (params.includes('genre=')) {
      return params.match(/\d+/g);
    }
    return false;
  }

  static UrlParamSearchByDuration() {
    return this.Url().searchParams.get('durationMax');
  }

  static UrlParamSearchBySelectedMovie() {
    return this.Url().searchParams.get('movie');
  }
}
