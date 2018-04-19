const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('file-system');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

let mainWindow;
if (isDev && !process.env.WEBBASED) require('electron-reload')(__dirname);

// Standard stuff
app.on('ready', function() {
  mainWindow = new BrowserWindow({ width: 1440, height: 680 });
  const dirname = __dirname || path.resolve(path.dirname(''));
  if (process.env.WEBBASED) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(dirname, './index.html')}`);
  }
  mainWindow.on('closed', () => app.quit()); //Para que cierre tb los hijos si cerramos el main
  const mainMenu = Menu.buildFromTemplate(menuTemplate); //Función que coge el modelo para el menú
  Menu.setApplicationMenu(mainMenu); //Y ahora lo crea. Es mejor crearlo en función de la ventana activa
});

//Barra de tareas
const menuTemplate = [
  //Sólo 1 objeto, si ponemos más son más menús
  {
    label: 'Archivo',
    submenu: [
      {
        label: 'Exportar registro de vacaciones',
        click() {
          exportProfiles();
        }
      },
      {
        label: 'Importar registro de vacaciones',
        click() {
          importProfiles();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({}); //Para MAC Systems, poner file donde toca (unshift pone {} en la 1a posición array)
}

if (process.env.NODE_ENV === 'production') {
  //production, development, staging, test
  menuTemplate.push({
    label: 'Ver',
    submenu: [
      { role: 'reload' }, //Carga un botón por defecto (podría hacerse abajo tb)
      {
        label: 'Herramientas de depuración',
        accelerator:
          process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          //Ventana activa
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

function exportProfiles() {
  const registryDir = `${path.join(app.getPath('userData'), './config.json')}`;
  console.log(registryDir);
  dialog.showSaveDialog(
    {
      filters: [{ name: 'json', extensions: ['json'] }],
      title: 'Exportar registro de vacaciones'
    },
    function(filename) {
      if (filename === undefined) return;
      fs.copyFile(registryDir, filename, err => {
        if (err === undefined) {
          dialog.showMessageBox({
            message:
              'El registro de vacaciones ha sido exportado satisfactoriamente',
            buttons: ['OK']
          });
        } else {
          dialog.showErrorBox(
            'Ha ocurrido un error al tratar de exportar el registro de vacaciones',
            err.message
          );
        }
      });
    }
  );
}

function importProfiles() {
  const registryDir = `${path.join(app.getPath('userData'), './config.json')}`;
  dialog.showOpenDialog(
    {
      filters: [{ name: 'json', extensions: ['json'] }],
      title: 'Importar registro de vacaciones',
      properties: ['openFile']
    },
    function(filename) {
      if (filename === undefined) return;
      fs.copyFileSync(filename[0], registryDir);
      app.relaunch();
      app.exit(0);
    }
  );
}

//Acciones de electrón
ipcMain.on('ask_profiles_year', (event, year) => {
  const profile_keys = store.has(String(year))
    ? Object.keys(store.get(String(year)))
    : [];
  let profile_names = [];
  profile_names = profile_keys.map(profile_key => {
    if (profile_key != 'officialHolidays') {
      let parameter = String(year)
        .concat('.')
        .concat(profile_key)
        .concat('.name');
      return store.get(parameter);
    }
  });
  profile_names = profile_names.filter(function(n) {
    return n != undefined;
  });
  mainWindow.webContents.send('load_profiles_year', profile_names);
});

ipcMain.on('create_or_save_user_holidays', (event, state) => {
  //Colgará del año de las vacaciones
  const profile_key = state.name.replace(/\s/g, '');
  const completeKey = String(state.year)
    .concat('.')
    .concat(profile_key);
  store.set(completeKey, state);
});

ipcMain.on('ask_delete_user', (event, state) => {
  const profile_key = state.name.replace(/\s/g, '');
  const completeKey = String(state.year)
    .concat('.')
    .concat(profile_key);
  store.delete(completeKey, state);
});

ipcMain.on('ask_user_holidays', (event, completeKey) => {
  const loadedData = store.get(completeKey);
  mainWindow.webContents.send('load_user_holidays', loadedData);
});

ipcMain.on('save_official_holidays', (event, state) => {
  //Colgará del año de las vacaciones
  const completeKey = String(state.year)
    .concat('.officialHolidays.')
    .concat(state.day);
  if (state.add == true) {
    store.set(completeKey, 'vacacion-oficial');
  } else {
    store.set(completeKey, 'laboral');
  }
});

ipcMain.on('ask_official_holidays', (event, completeKey) => {
  const loadedData = store.get(completeKey);
  mainWindow.webContents.send('load_official_holidays', loadedData);
});
