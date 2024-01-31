/** @format */

import React, { useContext, useEffect } from "react";

import { SocketContext } from "../context/SocketContext";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -70.64827,
  lat: -33.45694,
  zoom: 13.5,
};

export const MapaPage = () => {
  const {
    setRef,
    coords,
    nuevoMarcador$,
    movimientoMarcador$,
    agregarMarcador,
    actualizarPosicion,
  } = useMapbox(puntoInicial);
  const { socket } = useContext(SocketContext);

  // Escuchar los marcadores existentes
  useEffect(() => {
    socket.on("marcadores-activos", (marcadores) => {
      for (const key of Object.keys(marcadores)) {
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);

  // Nuevo marcador
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      socket.emit("marcador-nuevo", marcador);
    });
  }, [nuevoMarcador$, socket]);

  // Movimiento de Marcador
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      socket.emit("marcador-actualizado", marcador);
    });
  }, [socket, movimientoMarcador$]);

  // Mover marcador mediante sockets
  useEffect(() => {
    socket.on("marcador-actualizado", (marcador) => {
      actualizarPosicion(marcador);
    });
  }, [socket, actualizarPosicion]);

  // Escuchar nuevos marcadores
  useEffect(() => {
    socket.on("marcador-nuevo", (marcador) => {
      agregarMarcador(marcador, marcador.id);
    });
  }, [socket, agregarMarcador]);

  return (
    <>
      <div className='info'>
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>

      <div ref={setRef} className='mapContainer' />
    </>
  );
};
