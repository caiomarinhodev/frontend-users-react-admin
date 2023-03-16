import { Create, Datagrid, Edit, EmailField, List, PasswordInput, SimpleForm, TextField, TextInput } from "react-admin";

export const UserList = (data) => (
    <List>
        <Datagrid data={data.data} rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="password" />
        </Datagrid>
    </List>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Create>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <PasswordInput source="password" />
        </SimpleForm>
    </Edit>
);