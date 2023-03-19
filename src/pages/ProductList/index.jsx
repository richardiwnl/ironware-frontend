import React from 'react';
import { Button, Pagination, Table } from 'rsuite';
import { get } from 'lodash';

import IHeader from '../../components/Header';
import axios from '../../services/axios';
import Centered from './styled';

const { Column, HeaderCell, Cell } = Table;
let defaultData = [];

const getData = async () => {
  const response = await axios.get('produtos/');
  defaultData = get(response, 'data.produtos', []);
};

getData();
export default function ProductList() {
  const [limit, setLimit] = React.useState(8);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  console.log(defaultData);

  const data = defaultData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  return (
    <>
      <IHeader dashboard />
      <Centered>
        <div>
          <h3
            style={{
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
            Listagem de Produtos
          </h3>
          <Table
            height={410}
            width={1000}
            style={{ marginTop: '10px', padding: 'none' }}
            bordered
            renderEmpty={() => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50vh',
                }}
              >
                Nenhum produto cadastrado
              </div>
            )}
            data={data}
            onRowClick={rowData => {
              console.log(rowData);
            }}
          >
            <Column width={60} align="center" fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={300}>
              <HeaderCell>Nome</HeaderCell>
              <Cell dataKey="nome" />
            </Column>

            <Column width={200}>
              <HeaderCell>Marca</HeaderCell>
              <Cell dataKey="marca" />
            </Column>

            <Column width={100}>
              <HeaderCell>Quantidade</HeaderCell>
              <Cell dataKey="quantidade" />
            </Column>

            <Column width={100}>
              <HeaderCell>Valor</HeaderCell>
              <Cell dataKey="valor" />
            </Column>

            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button
                    appearance="link"
                    // eslint-disable-next-line no-alert
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Editar
                  </Button>
                )}
              </Cell>
            </Column>

            <Column width={80} fixed="right">
              <HeaderCell>...</HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button
                    appearance="link"
                    // eslint-disable-next-line no-alert
                    onClick={() => alert(`id:${rowData.id}`)}
                  >
                    Apagar
                  </Button>
                )}
              </Cell>
            </Column>
          </Table>
          <div style={{ padding: 20 }}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size="sm"
              layout={['pager']}
              total={defaultData.length}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
          </div>
        </div>
      </Centered>
    </>
  );
}
