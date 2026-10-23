import {adminClient,json,requireAdmin} from '../_lib.js';
const allowed=new Set(['pending','payment_review','paid','processing','completed','rejected']);
export default async function handler(req,res){
 if(!['GET','PATCH'].includes(req.method))return json(res,405,{error:'Method not allowed'});
 try{
  const gate=await requireAdmin(req);if(gate.error)return json(res,gate.status,{error:gate.error});const db=gate.client;
  if(req.method==='GET'){const {data,error}=await db.from('orders').select('id,created_at,game,game_label,player_id,server_id,package_name,amount_mmk,contact,payment_method,payment_reference,status').order('created_at',{ascending:false}).limit(100);if(error)throw error;return json(res,200,{orders:data});}
  const {id,status}=req.body||{};if(typeof id!=='string'||id.length>80||!allowed.has(status))return json(res,400,{error:'Invalid order ID or status'});
  const {data,error}=await db.from('orders').update({status,updated_at:new Date().toISOString(),verified_by:gate.user.id,verified_at:status==='paid'?new Date().toISOString():null}).eq('id',id).select('id,status').single();if(error)throw error;
  return json(res,200,{order:data});
 }catch(e){return json(res,500,{error:'Admin operation failed',detail:process.env.NODE_ENV==='development'?e.message:undefined});}
}