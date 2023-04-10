import base from '../DataBase';

export default function ViewCount(id){
    base('View').create([
        {
          "fields": {
            "Blog": [id]
          }
        }
      ], {typecast: true}, function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
        });
    });
}