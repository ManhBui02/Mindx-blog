import base from "../DataBase";

export default function BlogDetail(id, setData){
    base('Blog').find(id, function(err, record) {
        if (err) { console.error(err); return; }
        setData(record.fields);
    });    
}