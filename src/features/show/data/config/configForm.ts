const configForm = {
  name: "Show Configuration Form",
  type: "configuration",
  isActive: true,
  fields: [
    {
      type: "fieldarray",
      name: "routes",
      label: "Routes",
      fields: [
        /*
      {
        route: "lobby",
        label: "Lobby",
        isActive: true,
      },

      [{name:'route', name:'label', name:'isActive', name:'id'}]
      
      */
        {
          type: "switch",
          name: "isActive",
          label: "Is Active?",
        },
        {
          type: "textfield",
          name: "route",
          label: "Route",
        },
        {
          type: "textfield",
          name: "label",
          label: "Label",
        },
      ],
    },
    {
      type: "textfield",
      name: "browser_tab_title",
      label: "Browser Tab Title",
    },
    {
      type: "textarea",
      name: "landing_page_content",
      label: "Landing Page Content",
    },
    {
      type: "textfield",
      name: "site_logo_url",
      label: "Site Logo Url",
    },
    {
      type: "textfield",
      name: "favicon_url",
      label: "Favicon",
    },
    {
      type: "textfield",
      name: "landing_page_banner",
      label: "Landing Page Banner",
    },
    {
      type: "textfield",
      name: "private_agenda_url",
      label: "Private Agenda Url",
    },
    {
      type: "textfield",
      name: "public_agenda_url",
      label: "Public Agenda Url",
    },
    {
      type: "textfield",
      name: "welcome_video_url",
      label: "Welcome Video Url",
    },
    {
      type: "colorpicker",
      name: "primary_color",
      label: "Primary Color",
    },
    {
      type: "colorpicker",
      name: "secondary_color",
      label: "Secondary Color",
    },
    {
      type: "fieldarray",
      name: "sponsors",
      label: "Sponsors",
      fields: [
        {
          type: "textfield",
          name: "title",
          label: "Title",
        },
        {
          type: "textfield",
          name: "sponsorship",
          label: "Sponsorship Level",
        },
        {
          type: "textfield",
          name: "logo_url",
          label: "Logo Url",
        },
        {
          type: "textfield",
          name: "exhibit_url",
          label: "Exhibit Url",
        },
      ],
    },
    {
      type: "fieldarray",
      name: "topic_maps",
      label: "Topic Map",
      fields: [
        {
          type: "textfield",
          name: "name",
          label: "Name",
        },
        {
          type: "textfield",
          name: "photo_url",
          label: "Photo Url",
        },
      ],
    },
  ],
};

export default configForm;
