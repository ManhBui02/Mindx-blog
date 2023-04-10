import base from "../DataBase";

function selectComments(id, setData, targetPage=1){
    let currentPage = 1;
    base('Comment').select({
        filterByFormula: `Blog="${id}"`,
        sort: [{field: 'Date Created', direction: 'desc'}],
        view: 'Active'
    }).eachPage(function page(records, fetchNextPage) {
        if (currentPage !== targetPage){
            currentPage++;
            fetchNextPage();
        }
        let data = [];
        records.forEach(function(record) {
            data = [...data, 
                    {
                        id: record.id,
                        name: record.get('NickName'),
                        content: record.get('Content'),
                        Date_Created: record.get('Date Created')
                    }
            ];
        });
        setData(data);
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

function createComment(id, nickname, content){
    return new Promise((resolve, reject) => {
        base('Comment').create([
            {
              "fields": {
                "Content": content,
                "NickName": nickname,
                "Blog": id
              }
            }
          ], {typecast: true}, function(err, records) {
            if (err) {
              reject(err);
            }
            records.forEach(function (record) {
              resolve(record.getId());
            });
        });
    })
}

export {selectComments, createComment};