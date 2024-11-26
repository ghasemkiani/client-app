import { cutil } from "@ghasemkiani/base";
import { X } from "@ghasemkiani/xdom";

const hasher = {
  uriToMethodAndParams(uri) {
    let app = this;
    let { hash } = new URL(uri, app.url);
    let [match, path, searchParams] = /^#?([^?]*)\??(.*)$/.exec(hash);

    let method = X.toCamelCase(
      "to-go-" +
        (path
          .split("/")
          .filter((a) => !!a)
          .join("-") || "home"),
    );
    let params;
    if (searchParams) {
      params = Object.fromEntries(new URLSearchParams(searchParams).entries());
    }
    return { method, params };
  },
  methodAndParamsToUri(method, params, hash = null) {
    let app = this;
    let uri =
      "#" +
      X.toDashed(method)
        .replace(/-/g, "/")
        .replace(/^to\/go\//, "")
        .replace(/^home$/, "");
    if (cutil.a(params)) {
      uri += `?`;
      let usp = new URLSearchParams(cutil.asObject(params));
      if (usp.size > 0) {
        uri += `${usp.toString()}`;
      }
    }
    return uri;
  },
};

export { hasher };
