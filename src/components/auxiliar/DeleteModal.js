import React from 'react';

export default (DeleteModal = () => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              ¿Quieres eliminar este perfil?
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Esta acción no se puede deshacer.</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Yes
            </button>
            <button type="button" className="btn btn-primary">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
