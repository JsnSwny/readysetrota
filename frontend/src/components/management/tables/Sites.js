import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSites, deleteSite } from "../../../actions/employees";
import SmallModal from "../../layout/SmallModal";
import DepartmentForm from "../forms/DepartmentForm";
import { deleteDepartment } from "../../../actions/employees";
import ConfirmModal from "../../layout/confirm/ConfirmModal";
import SiteForm from "../forms/SiteForm";
import Title from "../../common/Title";

const Sites = () => {
  const dispatch = useDispatch();
  let sites = useSelector((state) => state.employees.sites);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState("");
  const [filteredSites, setFilteredSites] = useState({});
  const [nameSortAZ, setNameSortAZ] = useState(false);
  const [editSite, setEditSite] = useState(false);

  useEffect(() => {
    dispatch(getSites());
  }, []);

  useEffect(() => {
    if (sites.length > 0) {
      setFilteredSites(sites);
    }
  }, [sites]);

  return (
    <div className="wrapper--md">
      {open && (
        <SmallModal
          open={open}
          setOpen={setOpen}
          title={editSite ? `Edit ${editSite.name}` : "Add a new site"}
        >
          <SiteForm setOpen={setOpen} editSite={editSite} />
        </SmallModal>
      )}

      {confirmOpen && selectedSite && (
        <ConfirmModal
          title={`Are you sure you want to delete the ${selectedSite.name} site?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            dispatch(deleteSite(selectedSite.id));
          }}
        />
      )}

      <Title
        name="Sites"
        subtitle="Manage your sites"
        buttons={[
          {
            name: "+ Add a site",
            clickAction: () => {
              setEditSite(false);
              setOpen(true);
            },
          },
        ]}
      />
      <table className="listing">
        <thead>
          <tr>
            <th>Name</th>
            <th>No. of Employees</th>
            <th className="right"></th>
          </tr>
        </thead>
        <tbody>
          {filteredSites.length > 0 &&
            filteredSites.map((item) => (
              <tr className="listing__row">
                <td className="text-black font-bold">{item.name}</td>
                <td>{item.number_of_employees}</td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      class="fas fa-edit"
                      onClick={() => {
                        setEditSite(item);
                        setOpen(true);
                      }}
                    ></i>
                    <i
                      class="fas fa-trash"
                      onClick={() => {
                        setSelectedSite(item);
                        setConfirmOpen(true);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sites;
