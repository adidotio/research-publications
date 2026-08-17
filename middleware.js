import { NextRequest, NextResponse } from 'next/server'

const LANGUAGE_PATH = new RegExp('^/(?:mn-mong|sr-cyrl|sr-latn|zh-hans|zh-hant|es-419|en-us|en-gb|en-ca|en-au|fr-fr|fr-ca|fr-be|fr-ch|de-de|de-at|de-ch|pt-pt|pt-br|es-es|mww|af|sq|am|ar|hy|as|az|ba|eu|bn|bs|pt|bg|ca|hr|cs|da|dv|nl|en|et|fo|fj|fl|fi|fr|gl|ka|de|el|gu|ht|ha|he|hi|hu|is|ig|id|iu|ga|it|ja|kn|kk|rw|ko|ku|ky|lo|lv|ln|lt|lg|mk|mg|ms|ml|mt|mr|ne|no|or|ps|fa|pl|pa|ro|ru|sm|sd|si|sk|sl|so|es|sw|sv|ty|ta|tt|te|th|bo|ti|to|tr|tk|uk|ur|ug|uz|vi|cy|xh|yo|zu)(?:/|$)', 'i')

export function middleware(request: NextRequest) {
  if (!LANGUAGE_PATH.test(request.nextUrl.pathname)) return NextResponse.next()

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://sub-proxy.multilipi.com')
  const headers = new Headers(request.headers)
  headers.set('X-Translation-Mode', 'sub-directory')
  headers.set('X-Original-Host', 'www.research-flow.in')
  return NextResponse.rewrite(destination, { request: { headers } })
}

export const config = { matcher: '/:path*' }
