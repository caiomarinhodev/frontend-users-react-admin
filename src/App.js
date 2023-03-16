import * as React from "react";
import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { UserCreate, UserEdit, UserList } from "./users/Users";
import { fetchUtils } from "ra-core";
const axios = require("axios");

const apiUrl = "http://127.0.0.1:4000";
const dataProvider = jsonServerProvider(apiUrl);

const myDataProvider = {
  ...dataProvider,
  getList: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return fetchUtils
      .fetchJson(url, {
        method: "GET",
        headers: new Headers({ Accept: "application/json" }),
      })
      .then(({ headers, json }) => {
        json = json.map((item) => {
          item.id = item._id;
          return item;
        });
        return {
          data: json,
          total: json.length,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getOne: (resource, params) =>
    fetchUtils
      .fetchJson(`${apiUrl}/${resource}/${params.id}`, {
        method: "GET",
        headers: new Headers({ Accept: "application/json" }),
      })
      .then(({ json }) => {
        json.id = json._id;
        return { data: json };
      }),
  delete: (resource, params) =>
    fetchUtils
      .fetchJson(`${apiUrl}/${resource}/${params.id}`, {
        method: "DELETE",
      })
      .then(({ json }) => ({ data: json })),

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => {
        return json;
      }),
    })),
};

const App = () => (
  <Admin dataProvider={myDataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />
  </Admin>
);

export default App;
