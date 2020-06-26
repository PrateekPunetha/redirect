const BASE_URL = 'https://prateekpunetha.me/'
const DOWNLOAD_URL = 'https://download.prateekpunetha.me/'
const DOWNLOAD_DEST_URL = 'https://dl.prateekpunetha.me/'
const GITHUB_USERNAME = 'prateekpunetha'
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`

export async function handleRequest(request: Request): Promise<Response> {
  if (request.url.startsWith(DOWNLOAD_URL)) {
    return redirectDownload(request, DOWNLOAD_URL, DOWNLOAD_DEST_URL)
  } else if (request.url.startsWith(BASE_URL)) {
    return redirectGithub(request, BASE_URL, GITHUB_URL)
  } else {
    return fetch(request)
  }
}

async function redirectDownload(
  request: Request,
  sourceDomain: string,
  destinationDomain: string,
): Promise<Response> {
  return Response.redirect(
    request.url.replace(sourceDomain, destinationDomain),
    301,
  )
}

async function redirectGithub(
  request: Request,
  baseDomain: string,
  githubUrl: string,
): Promise<Response> {
  const urlParts = request.url.replace(baseDomain, '').split('/')
  switch (urlParts[0]) {
    case 'g':
      switch (urlParts.length) {
        case 1:
          return Response.redirect(githubUrl, 301)
        case 2:
          return Response.redirect(`${githubUrl}/${urlParts[1]}`, 301)
        case 3:
          return Response.redirect(
            `${githubUrl}/${urlParts[1]}/commit/${urlParts[2]}`,
            301,
          )
      }
  }
  return fetch(request)
}
