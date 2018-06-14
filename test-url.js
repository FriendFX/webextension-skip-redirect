const test = require("tape");

const base64 = require("./base64");
const url = require("./url");

const queryAndFragment = "?some=parameter&some-other=parameter;another=parameter#some-fragment";

const wwwTargetUrl = "www.redirection.target.com/" + queryAndFragment;
const wwwTargetUrlEncoded = encodeURIComponent(wwwTargetUrl);
const wwwTargetUrlDoubleEncoded = encodeURIComponent(wwwTargetUrlEncoded);

const someTargetUrl = "some.www.redirection.target.com/" + queryAndFragment;
const someTargetUrlEncoded = encodeURIComponent(someTargetUrl);
const someTargetUrlDoubleEncoded = encodeURIComponent(someTargetUrlEncoded);

test("URL in query path - http URLs url-encoded and not", function(assert) {

    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http://" +             someTargetUrl, []),                             "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http%3A%2F%2F" +       someTargetUrlEncoded, []),                      "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http%3A%2F%2F" +       someTargetUrlEncoded + "&unwanted", []),        "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http%253A%252F%252F" + someTargetUrlDoubleEncoded, []),                "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http%253A%252F%252F" + someTargetUrlDoubleEncoded + "&unwanted", []),  "http://"  + someTargetUrl);
    assert.end();
});

test("URL in query path - http URLs url-encoded and not - lowercase", function(assert) {
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/"  + "http://" +             someTargetUrl).toLowerCase(), []),              "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/"  + "http%3A%2F%2F" +       someTargetUrlEncoded).toLowerCase(), []),       "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/"  + "http%253A%252F%252F" + someTargetUrlDoubleEncoded).toLowerCase(), []), "http://"  + someTargetUrl);
    assert.end();
});

test("URL in query path - works with initial /? and ? instead of slash", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/?" + "http://" +  someTargetUrl, []),                                        "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "?"  + "http://" +  someTargetUrl, []),                                        "http://"  + someTargetUrl);
    assert.end();
});

test("URL in query path - correct http handling", function(assert) {
    assert.equal(url.getRedirectTarget("https://" + "www.some.website.com" + "/"  + "http://" +  someTargetUrl, []),                                        "http://"  + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "https://" + someTargetUrl, []),                                        "https://" + someTargetUrl);
    assert.end();
});

test("URL in query path - http URLs with some parts being url-encoded and others not", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "http://" +  someTargetUrlEncoded, []),                                 "http://"  + someTargetUrl);
    assert.end();
});

test("URL in query path - www URLs work without http", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  +               wwwTargetUrl, []),                                        "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  +               wwwTargetUrlDoubleEncoded, []),                           "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  +               wwwTargetUrlEncoded, []),                                 "http://"  + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/"  + "https://" +  wwwTargetUrl, []),                                        "https://" + wwwTargetUrl);
    assert.end();
});

test("URL in query parameter - http URLs url-encoded and not", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl, []),                                                  "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl +        "?yet-another=parameter", []),                "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "&yet-another=parameter", []),                "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + ";yet-another=parameter", []),                "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "#yet-another-fragment", []),                 "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded, []),                                     "http://" + someTargetUrl);
    assert.end();
});

test("URL in query parameter - http URLs url-encoded and not - lowercase", function(assert) {
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl).toLowerCase(), []),                                   "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrl +        "?yet-another=parameter").toLowerCase(), []), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "&yet-another=parameter").toLowerCase(), []), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + ";yet-another=parameter").toLowerCase(), []), "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http%3A%2F%2F" +       someTargetUrlEncoded + "#yet-another-fragment").toLowerCase(), []),  "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget(("http://" + "www.some.website.com" + "/" + "?target=" + "http%253A%252F%252F" + someTargetUrlDoubleEncoded).toLowerCase(), []),                      "http://" + someTargetUrl);
    assert.end();
});

test("URL in query parameter - http URLs with some parts being url-encoded and others not", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" + "http://" +             someTargetUrlEncoded, []),                                           "http://" + someTargetUrl);
    assert.end();
});

test("URL in query parameter - www URLs work without http", function(assert) {
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrl, []),                                                   "http://" + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrl +        "?yet-another=parameter", []),                 "http://" + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrlEncoded + "&yet-another=parameter", []),                 "http://" + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrlEncoded + ";yet-another=parameter", []),                 "http://" + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrlEncoded + "#yet-another-fragment", []),                  "http://" + wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://"  + "www.some.website.com" + "/" + "?target=" +                         wwwTargetUrlDoubleEncoded, []),                                      "http://" + wwwTargetUrl);
    assert.end();
});

test("recursion", function(assert) {

    const wwwTargetUrlOne =  wwwTargetUrl + "-ONE";
    const wwwTargetUrlTwo =  wwwTargetUrl + "-TWO";

    assert.equal(url.getRedirectTarget("http://www.some.website.com/" +                                             wwwTargetUrlOne + "/" +                                       wwwTargetUrlTwo, []),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" +                                 "http://" + wwwTargetUrlOne + "/" +                           "http://" + wwwTargetUrlTwo, []),   "http://" + wwwTargetUrlTwo);

    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" +                                wwwTargetUrlOne + "&target=" +                                wwwTargetUrlTwo, []),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" +                    "http://" + wwwTargetUrlOne + "&target=" +                    "http://" + wwwTargetUrlTwo, []),   "http://" + wwwTargetUrlTwo);
    assert.equal(url.getRedirectTarget("http://www.some.website.com/" + "?target=" + encodeURIComponent("http://" + wwwTargetUrlOne + "&target=" + encodeURIComponent("http://" + wwwTargetUrlTwo)), []), "http://" + wwwTargetUrlTwo);

    assert.end();
});

test("no skipping if URL matches one of given exceptions", function(assert) {

    const noRedirectUrls = [
        wwwTargetUrl,
        "http://www.some.website.com/" + wwwTargetUrl.replace("www.", "www"),
        "http://www.some.website.com/" + "login?continue=" + wwwTargetUrl + "#some-fragment",
        "http://www.some.website.com/" + "login?continue=" + wwwTargetUrlEncoded + "#some-fragment",
        "http://www.some.website.com/" + "login?continue=" + wwwTargetUrlDoubleEncoded + "#some-fragment]",
        "http://www.some.website.com/" + "Login?continue=" + wwwTargetUrlDoubleEncoded + "#some-fragment]",
    ];

    for (let urlString of noRedirectUrls) {
        assert.equal(url.getRedirectTarget(urlString, ["/login"]), urlString);
    }

    assert.end();
});

test("base64 encoded URLs - no valid URL", function(assert) {
    const noUrlBase64Url = "http://" + "www.some.website.com" + "/" + base64.encode("wwwwwwww");
    assert.equal(url.getRedirectTarget(noUrlBase64Url, []), noUrlBase64Url);
    assert.end();
});

test("base64 encoded URLs - in path", function(assert) {
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +                   base64.encode(wwwTargetUrl), []),                                     "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +                   base64.encode(wwwTargetUrl + "\n" + someTargetUrl), []),              "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +                   base64.encode("http://" + someTargetUrl), []),                        "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" +                   base64.encode("http://" + someTargetUrl) + "#some-fragment", []),     "http://" + someTargetUrl);
    assert.end();
});

test("base64 encoded URLs - in path with junk in front of it", function(assert) {
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "973abcCDE." +    base64.encode(wwwTargetUrl), []),                                     "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "973abcCDE." +    base64.encode(wwwTargetUrl + "\n" + someTargetUrl), []),              "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "973abcCDE." +    base64.encode("http://" + someTargetUrl), []),                        "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "973abcCDE." +    base64.encode("http://" + someTargetUrl) + "#some-fragment", []),     "http://" + someTargetUrl);
    assert.end();
});

test("base64 encoded URLs - in query string value", function(assert) {
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +      base64.encode(wwwTargetUrl), []),                                     "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +      base64.encode(wwwTargetUrl + "\n" + someTargetUrl), []),              "http://" +  wwwTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +      base64.encode("http://" + someTargetUrl), []),                        "http://" + someTargetUrl);
    assert.equal(url.getRedirectTarget("http://" + "www.some.website.com" + "/" + "?target=" +      base64.encode("http://" + someTargetUrl, []) + "#some-fragment", []), "http://" + someTargetUrl);
    assert.end();
});

test("real world examples", function(assert) {
    assert.equal(url.getRedirectTarget("https://deref-gmx.net/mail/client/RV25X0rqGXk/dereferrer/?redirectUrl=https%3A%2F%2Fpublic-api.wordpress.com%2Fbar%2F%3Fstat%3Dgroovemails-events%26bin%3Dwpcom_email_click%26redirect_to%3Dhttps%253A%252F%252Fsubscribe.wordpress.com%252F%253Fkey%253D0fb618e5ec04dd36ee50f42cc85f7f10%2526email%253Dmy.email%252540example.com%2526locale%253Den-gb%2526activate%253De42d67dde1422d2e8daadf2410888f5c%26sr%3D1%26signature%3D607ead5199c17060251242bfc204cff5%26user%3D0%26_e%3Da20suJIlGIgilTlOlZYIWcpjGIy32mNSbic1zFZ2IdQOmWF1CYGOibijjhyJNTXcgpmcCbZxIJWyUyyii6GIGyEJ6VfV1OI9NcflBu6b1nIIZGaGyYY3jIcbwIcb9ni5GIbcDbjQI9WiIi9lmw51IIbbBwbRt4lQyxiWFNejjhVlW1WZNcYhw2EsmdTIJNViW3II3In14wiSIi1lNTiWvMh6TAIINSice9afdIHYxhisvwkJIv9TZ3s29399iaIC6Cda3jTDztMbzUxMynIplw5eiV2CmbjIQwUbfFWbnvd16nWIX2NUvVtImddnD94iZLXyFE2jNhIwy2ROtp11MxFCiMNYJaJS9nOOU01C9YkblyVdFain6bIXIvtiiFjSgLR9WbNwINnJZifl9MvtwvxlfVi0aXWCcMMeOHe21YMLsicDLMysjXNNGl1cGOI6ZQG0sl5pxOtVVuFy5C9ZJpiYAzWiIsvGRlWycZidTiRREisXQJWMAMb21UCGb2Rticw6Yb6EiCcZFmFitOYiLmAmr6bWGsnQIJNm5bJLolbW%26_z%3Dz", []),
                 "https://public-api.wordpress.com/bar/?stat=groovemails-events&bin=wpcom_email_click&redirect_to=https%3A%2F%2Fsubscribe.wordpress.com%2F%3Fkey%3D0fb618e5ec04dd36ee50f42cc85f7f10%26email%3Dmy.email%2540example.com%26locale%3Den-gb%26activate%3De42d67dde1422d2e8daadf2410888f5c&sr=1&signature=607ead5199c17060251242bfc204cff5&user=0&_e=a20suJIlGIgilTlOlZYIWcpjGIy32mNSbic1zFZ2IdQOmWF1CYGOibijjhyJNTXcgpmcCbZxIJWyUyyii6GIGyEJ6VfV1OI9NcflBu6b1nIIZGaGyYY3jIcbwIcb9ni5GIbcDbjQI9WiIi9lmw51IIbbBwbRt4lQyxiWFNejjhVlW1WZNcYhw2EsmdTIJNViW3II3In14wiSIi1lNTiWvMh6TAIINSice9afdIHYxhisvwkJIv9TZ3s29399iaIC6Cda3jTDztMbzUxMynIplw5eiV2CmbjIQwUbfFWbnvd16nWIX2NUvVtImddnD94iZLXyFE2jNhIwy2ROtp11MxFCiMNYJaJS9nOOU01C9YkblyVdFain6bIXIvtiiFjSgLR9WbNwINnJZifl9MvtwvxlfVi0aXWCcMMeOHe21YMLsicDLMysjXNNGl1cGOI6ZQG0sl5pxOtVVuFy5C9ZJpiYAzWiIsvGRlWycZidTiRREisXQJWMAMb21UCGb2Rticw6Yb6EiCcZFmFitOYiLmAmr6bWGsnQIJNm5bJLolbW&_z=z");
    assert.end();
});
