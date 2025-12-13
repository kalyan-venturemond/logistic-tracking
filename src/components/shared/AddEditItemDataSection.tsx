/* eslint-disable @typescript-eslint/no-explicit-any */
import AddEditItemInput from './AddEditItemInput';
import AddEditItemSelectMenu from './AddEditItemSelectMenu';
import {
  cities,
  drivers,
  languages,
  nationalities,
  recipients,
  shippers,
  vehicles,
} from '../../lib/data/mainData';

interface SelectMenuDataItem {
  sectionPrefix?: string;
  identifier?: string;
  options: any[];
  label: string;
  title: string;
  selectedItem: any;
}

interface AddEditItemDataSectionProps {
  title?: string;
  inputs: any;
  value: Record<string, any>;
  onChange: any;
  section?: 'driver' | 'shipment' | 'shipper' | 'recipient';
  page?: 'addAdmin' | 'editAdmin' | 'addDriver' | 'editDriver';
  setFormData?: () => void;
}

const AddEditItemDataSection = ({
  title,
  inputs,
  value,
  onChange,
  section,
  page,
}: AddEditItemDataSectionProps) => {
  const getSelectedItem = (options: any[], identifier: string) => {
    return options?.find((option) => option.id === value[`${identifier}Id`]) || null;
  };

  const selectMenuData = ((): SelectMenuDataItem | SelectMenuDataItem[] | null => {
    const citiesData = {
      options: cities,
      title: 'City',
    };

    if (section) {
      switch (section) {
        case 'driver':
          return [
            {
              sectionPrefix: 'driver',
              options: drivers,
              label: 'Select Driver',
              title: 'Driver',
              selectedItem: getSelectedItem(drivers, 'driver'),
            },
            {
              sectionPrefix: 'driverVehicle',
              options: vehicles,
              label: 'Select Truck Type',
              title: 'Truck',
              selectedItem: getSelectedItem(vehicles, 'driverVehicle'),
            },
          ];
        case 'shipment':
          return [
            {
              sectionPrefix: 'shipmentPickupCity',
              ...citiesData,
              label: 'Select Pickup City',
              selectedItem: getSelectedItem(cities, 'shipmentPickupCity'),
            },
            {
              sectionPrefix: 'shipmentDropOffCity',
              ...citiesData,
              label: 'Select Delivery City',
              selectedItem: getSelectedItem(cities, 'shipmentDropOffCity'),
            },
          ];
        case 'shipper':
          return {
            sectionPrefix: 'shipper',
            options: shippers,
            label: 'Select Shipper',
            title: 'Shipper',
            selectedItem: getSelectedItem(shippers, 'shipper'),
          };
        case 'recipient':
          return {
            sectionPrefix: 'recipient',
            options: recipients,
            label: 'Select Recipient',
            title: 'Recipient',
            selectedItem: getSelectedItem(recipients, 'recipient'),
          };
        default:
          return null;
      }
    } else if (page) {
      const nationalitiesData = {
        identifier: 'nationality',
        options: nationalities,
        label: 'Select Nationality',
        title: 'Nationality',
        selectedItem: getSelectedItem(nationalities, 'nationality'),
      };

      switch (page) {
        case 'addAdmin':
        case 'editAdmin':
          return {
            ...nationalitiesData,
          };
        case 'addDriver':
        case 'editDriver':
          return [
            {
              identifier: 'vehicle',
              options: vehicles,
              label: 'Select Truck Type',
              title: 'Truck',
              selectedItem: getSelectedItem(vehicles, 'vehicle'),
            },
            {
              ...nationalitiesData,
              label: 'Select Driver Nationality',
            },
            {
              identifier: 'language',
              options: languages,
              label: 'Select Language',
              title: 'Language',
              selectedItem: getSelectedItem(languages, 'language'),
            },
          ];
        default:
          return null;
      }
    }
    return null;
  })();

  const handleShipmentPageSectionSelectMenuItemSelection = (
    selectedItem: any,
    sectionSelectMenuDataItem: SelectMenuDataItem,
  ) => {
    if (!selectedItem) return;

    const updates: Record<string, any> = {};
    const sectionPrefix = sectionSelectMenuDataItem?.sectionPrefix || section;

    if (sectionPrefix) {
      updates[`${sectionPrefix}Id`] = selectedItem.id;

      Object.entries(selectedItem).forEach(([key, val]) => {
        if (key === 'id') return;
        const formFieldName = `${sectionPrefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        updates[formFieldName] = val;
      });

      onChange({
        target: {
          value: updates,
        },
      });
    }
  };

  const handleItemPageSelectMenuItemSelection = (selectedItem: any, identifier: string) => {
    if (!selectedItem) return;
    onChange({
      target: {
        name: `${identifier}Id`,
        value: selectedItem?.id,
      },
    });
  };

  const renderedShipmentPageSectionSelectMenu = () => {
    if (section) {
      if (selectMenuData && Array.isArray(selectMenuData)) {
        return selectMenuData.map((item, index) => (
          <AddEditItemSelectMenu
            key={index}
            options={item?.options}
            label={item?.label}
            title={item?.title}
            onChange={(selectedItem) =>
              handleShipmentPageSectionSelectMenuItemSelection(selectedItem, item)
            }
            value={item?.selectedItem}
          />
        ));
      } else if (selectMenuData && !Array.isArray(selectMenuData)) {
        return (
          <AddEditItemSelectMenu
            options={selectMenuData?.options}
            label={selectMenuData?.label}
            title={selectMenuData?.title}
            onChange={(selectedItem) =>
              handleShipmentPageSectionSelectMenuItemSelection(selectedItem, selectMenuData)
            }
            value={selectMenuData?.selectedItem}
          />
        );
      }
    }
    return null;
  };

  const renderedItemPageSelectMenu = () => {
    if (page) {
      if (selectMenuData && Array.isArray(selectMenuData)) {
        return selectMenuData.map((item, index) => (
          <AddEditItemSelectMenu
            key={index}
            options={item?.options}
            label={item?.label}
            title={item?.title}
            onChange={(selectedItem) =>
              handleItemPageSelectMenuItemSelection(selectedItem, item.identifier || '')
            }
            value={item?.selectedItem}
          />
        ));
      } else if (selectMenuData && !Array.isArray(selectMenuData)) {
        return (
          <AddEditItemSelectMenu
            options={selectMenuData?.options}
            label={selectMenuData?.label}
            title={selectMenuData?.title}
            onChange={(selectedItem) =>
              handleItemPageSelectMenuItemSelection(selectedItem, selectMenuData.identifier || '')
            }
            value={selectMenuData?.selectedItem}
          />
        );
      }
    }
    return null;
  };

  return (
    <>
      {title && <h1 className='font-bold text-xl sm:text-2xl'>{title}</h1>}
      <div className='w-full grid gap-10 my-10 grid-cols-1 md:grid-cols-2'>
        {renderedShipmentPageSectionSelectMenu()}

        {inputs.map((input: any, index: number) => (
          <AddEditItemInput
            key={index}
            label={input.label}
            name={input.name}
            value={value[input.name]}
            onChange={onChange}
            description={input.description}
            type={input.type}
          />
        ))}

        {renderedItemPageSelectMenu()}
      </div>
    </>
  );
};

export default AddEditItemDataSection;
