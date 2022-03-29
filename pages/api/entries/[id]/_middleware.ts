import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const id = req.page.params?.id || '';
    const mongoIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if(!mongoIdRegExp.test(id)) {
        return new Response(JSON.stringify({message: 'Invalid id'}), 
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }    
            }
        );
    }
    return NextResponse.next();
}