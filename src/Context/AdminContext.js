import { createContext, useState } from "react";
import DataBase from '../DataBase';

const AdminContext = createContext();

const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(false);

    const checkAdmin = (username, password) => {
        return new Promise((resolve, reject) => {
            DataBase('Admin').select({
                filterByFormula: `AND(username="${username}", password="${password}")`,
                maxRecords: 1
            }).firstPage((err, record)=>{
                if (err){
                    reject(err);
                }
                if (record?.length){
                    setAdmin(true);
                    resolve(true);
                }else{
                    resolve(false);
                }
            })
        });
    }

    const data = {
        admin: admin,
        checkAdmin: checkAdmin
    }
    
    return (
        <AdminContext.Provider value={data}>
            {children}
        </AdminContext.Provider>
    );
}

export { AdminContext, AdminProvider };