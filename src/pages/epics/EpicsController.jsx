import React, { useState, useEffect } from 'react';
import EpicsView from './EpicsView';
import { getEpics } from '../../services/epics/getEpics';
import { useUserDetails } from '../../context/usercontext';
import { useProjectDetails } from '../../context/projectContext';
import { showErrorToast } from '../../utils/Toasts';
import { Navigate, useParams } from 'react-router-dom';

export default function EpicsController() {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [epics, setEpics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { projectId } = useParams();
  const [filter, setFilter] = useState('');
  const [epicsFiltered, setEpicsFiltered] = useState([]);
  const [update, setUpdate] = useState(false);

  if (!userDetails.accessToken) {
    return <Navigate replace to="/" />;
  }

  useEffect(() => {
    filterEpics();
  }, [filter]);

  useEffect(() => {
    onGetEpics();
  }, [projectId, update]);

  function onSearch(value) {
    setFilter(value.trim());
  }

  function isSubstringOf(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

  function onGetEpics() {
    setLoading(true);
    getEpics(userDetails.accessToken, projectId)
      .then((data) => {
        setEpics(data);
        console.log(filter !== '');
        if (filter !== '') {
          filterEpicsFromData(data);
        } else {
          setEpicsFiltered(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao buscar os épicos');
        setLoading(false);
      });
  }

  function filterEpics() {
    if (epics.length !== 0 && filter !== '') {
      setEpicsFiltered(
        epics.filter((epic) => isSubstringOf(epic.title, filter)),
      );
    } else if (filter === '') {
      setEpicsFiltered(epics);
    }
  }

  function filterEpicsFromData(data) {
    if (data.length !== 0 && filter !== '') {
      setEpicsFiltered(
        data.filter((epic) => isSubstringOf(epic.title, filter)),
      );
    } else if (filter === '') {
      setEpicsFiltered(data);
    }
  }

  return (
    <EpicsView
      projectDetails={projectDetails}
      loading={loading}
      epicsFiltered={epicsFiltered}
      update={update}
      onSearch={onSearch}
      setUpdate={setUpdate}
    />
  );
}
