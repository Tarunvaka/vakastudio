// www.vakastudio.com redirects to the one canonical host, vakastudio.com.
export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === "www.vakastudio.com") {
    url.hostname = "vakastudio.com";
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
