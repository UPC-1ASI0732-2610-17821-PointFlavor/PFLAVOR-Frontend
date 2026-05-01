export async function sendMessageUseCase(payload){
    await new Promise(r=>setTimeout(r,400));
    return { ok:true };
}
