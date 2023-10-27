module.exports = (sequelize, DataTypes) => {
    const PrestadorProfesiones = sequelize.define('PrestadorProfesiones', {
      idPrestador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idProfesion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'prestador_profesiones',
      timestamps: false,
    });
  
    PrestadorProfesiones.associate = function (models) {
      // relación con la tabla Usuario
      PrestadorProfesiones.belongsTo(models.Usuario, {
        foreignKey: {
          name: 'idprestador',
          allowNull: false,
        },
        targetKey: 'idUsuario',
        as: 'usuario',  
      });
  
      // relación con la tabla Profesion
      PrestadorProfesiones.belongsTo(models.Profesion, {
        foreignKey: 'idProfesion',
        as: 'profesion',
      });
    };
  
    return PrestadorProfesiones;
  };
  