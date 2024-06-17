import { Empty, Spin, Input } from 'antd';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import EpicItem from '../../components/epic-component/epic-item/epicItem.component';
import { EmptyDiv, SpinDiv, TableHeader } from './epics.styles';
import NewEpicForm from '../../components/epic-component/new-epic/newEpicForm.component';
import PageNavigator from '../../components/pageNavigator/pageNavigator';
import SGPSidebar from '../../components/sidebar/sidebar.component';
import Toolbar from '../../components/toolbar/toolbar.component';
const { Search } = Input;

export default function EpicsView({
  projectDetails,
  loading,
  epicsFiltered,
  update,
  onSearch,
  setUpdate,
}) {
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const epicsPage = epicsFiltered.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(epicsFiltered.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SGPSidebar />
      <div style={{ width: '100%' }}>
        <Toolbar
          menuItem={5}
          setShowBacklog={() => {}}
          setShowEpics={setShow}
          title={`${projectDetails.projectName} / Épicos`}
        />
        <NewEpicForm
          show={show}
          setShow={setShow}
          update={update}
          setUpdate={setUpdate}
          taskId={null}
        />

        <Search
          placeholder="Pesquise pelo nome do épico"
          allowClear
          enterButton="Pesquisar"
          size="large"
          onSearch={onSearch}
          style={{ paddingLeft: 8, paddingRight: 8, marginBottom: 24 }}
          onChange={(e) => onSearch(e.target.value)}
        />

        {loading ? (
          <SpinDiv>
            <Spin />
          </SpinDiv>
        ) : (
          <>
            {epicsFiltered.length !== 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>
                        <TableHeader>Nome do Épico</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Status</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Prazo</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Responsável</TableHeader>
                      </th>
                      <th>
                        <TableHeader>Ações</TableHeader>
                      </th>
                    </tr>
                  </thead>

                  {epicsPage.map((epic, index) => (
                    <EpicItem
                      key={epic.id}
                      epic={epic}
                      index={index}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  ))}
                </Table>
                <PageNavigator
                  numbers={numbers}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  nPage={nPage}
                />
              </>
            ) : (
              <EmptyDiv>
                <Empty description="Sem épicos existentes" />
              </EmptyDiv>
            )}
          </>
        )}

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </div>
  );
}
