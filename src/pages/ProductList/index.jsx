import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonToolbar, Pagination, Table, Modal } from 'rsuite';
import { get } from 'lodash';
import RemindIcon from '@rsuite/icons/legacy/Remind';

import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import IHeader from '../../components/Header';
import CustomLoader from '../../components/CustomLoader';
import axios from '../../services/axios';
import Centered from './styled';

const { Column, HeaderCell, Cell } = Table;
let defaultData = [];

export default function ProductList() {
  const [isLoading, setIsLoading] = useState(true);
  const [delId, setDelId] = useState(0);
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const history = useHistory();

  const downloadRelatorio = async () => {
    document.body.style.cursor = 'wait';
    await axios
      .get('relatorio/', {
        responseType: 'blob',
      })
      .then(response => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');

        link.href = href;
        link.setAttribute('download', `relatorio_${Date.now()}.pdf`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .finally(() => {
        document.body.style.cursor = 'default';
      });
  };

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleOpen = id => {
    setDelId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    setOpen(false);
    await axios.delete(`produtos/${delId}`);
    window.location.reload();
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    document.title = 'Ironware | Listagem de Produtos';
    const getData = async () => {
      const response = await axios.get('produtos/');
      defaultData = get(response, 'data.produtos', []);
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return (
      <>
        <IHeader dashboard />
        <CustomLoader isLoading />
      </>
    );
  }

  const data = defaultData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <Modal
        style={{ marginTop: '10vh' }}
        backdrop="static"
        role="alertdialog"
        open={open}
        onClose={handleClose}
        size="xs"
      >
        <Modal.Body>
          <RemindIcon style={{ color: '#ff0000', fontSize: 28, margin: 15 }} />
          Deseja apagar o produto selecionado?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} appearance="primary">
            Apagar
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
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
            width={950}
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
              <HeaderCell>Categoria</HeaderCell>
              <Cell dataKey="Categorium.nome" />
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
              <HeaderCell> </HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button
                    appearance="link"
                    onClick={() => history.push(`editar/${rowData.id}`)}
                  >
                    <EditIcon style={{ fontSize: 22 }} />
                  </Button>
                )}
              </Cell>
            </Column>

            <Column width={80} fixed="right">
              <HeaderCell> </HeaderCell>

              <Cell style={{ padding: '6px' }}>
                {rowData => (
                  <Button
                    appearance="link"
                    // eslint-disable-next-line no-alert
                    onClick={() => handleOpen(rowData.id)}
                  >
                    <TrashIcon style={{ fontSize: 22, color: 'red' }} />
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
          <ButtonToolbar>
            <Button appearance="primary" onClick={downloadRelatorio}>
              Baixar Relatório <FileDownloadIcon style={{ fontSize: 22 }} />
            </Button>
          </ButtonToolbar>
        </div>
      </Centered>
    </>
  );
}
