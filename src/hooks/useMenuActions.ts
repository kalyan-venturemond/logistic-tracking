/* eslint-disable @typescript-eslint/no-explicit-any */
import editShipmentIcon from '/images/edit-shipment-icon.svg';
import deleteShipmentIcon from '/images/delete-shipment-icon.svg';
export const useMenuActions = ([{ editLabel, editPath }, { deleteLabel, deletePath }]: any) => {
  const menuActions = [
    {
      label: editLabel,
      icon: editShipmentIcon,
      path: editPath,
    },
    {
      label: deleteLabel,
      icon: deleteShipmentIcon,
      path: deletePath,
    },
  ];

  return {
    menuActions,
  };
};
