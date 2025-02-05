export const ResponseSuccess = (code:number, message:string|null, data:any)=>{
    return Response.json({message, error:null, data}, {status: code})
}
export const ResponseError = (code:number,  error:string|null, data:any)=>{
    return Response.json({message:null, error, data}, {status: code})
}