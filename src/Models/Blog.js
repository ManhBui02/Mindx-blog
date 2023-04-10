import base from '../DataBase';

export default function BlogModel(filter, pageSize, setData, targetPage = 1){
    let currentPage = 1;
    base('Blog').select({
        pageSize: pageSize,
        sort: [{field: "View", direction: "desc"}],
        filterByFormula: `${filter ? (filter) : ""}`,
        view: 'Active'
    }).eachPage(function page(records, fetchNextPage) {
        if (currentPage !== targetPage){
            currentPage++;
            fetchNextPage();
            return;
        } 
        let data = [];
        records.forEach(function(record) {
            data = [...data,
                {
                    id: record.getId(),
                    title: record.get("Title"),
                    thumbnail: record.get("Thumbnail")[0].url,
                    category: record.get("Category"),
                    view: record.get("View"),
                    content: record.get("Content")
                }
            ];
        });
        setData(data);
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}