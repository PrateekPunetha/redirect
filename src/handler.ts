const BASE_URL = 'https://prateekpunetha.dev/'
const DOWNLOAD_URL = 'https://download.prateekpunetha.dev/'
const DOWNLOAD_DEST_URL = 'https://dl.prateekpunetha.dev/'
const GITHUB_USERNAME = 'prateekpunetha'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

export async function handleRequest(request: Request): Promise<Response> {
  if  (request.url.startsWith(DOWNLOAD_URL)) {
    return redirectDownload(request)
  } else if (request.url.startsWith(BASE_URL)) {
    return redirectGitHub(request)
  } else {
    return fetch(request)
  }
}

async function redirectDownload(request: Request): Promise<Response> {
  return Response.redirect(
    request.url.replace(DOWNLOAD_URL, DOWNLOAD_DEST_URL),
    301,
  )
}

async function redirectGitHub(request: Request): Promise<Response> {
  const urlParts = request.url.replace(BASE_URL, '').split('/')
  switch (urlParts[0]) {
    case 'g':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(GITHUB_URL, 301)
        case 2:
          return Response.redirect(`${GITHUB_URL}/${urlParts[1]}`, 301)
        case 3:
          return Response.redirect(
            `${GITHUB_URL}/${urlParts[1]}/commit/${urlParts[2]}`,
            301,
          )
      }
  }
  return fetch(request)
}
