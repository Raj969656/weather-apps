import React, { useState } from "react";
//elcome to weather app ke upar ka logo h

//ye ak page se dusre pe le jane ke liye navigation ko use kiya gya h
import { useNavigate } from "react-router";
//ye pop up messgae data recived karne ka h 
import { toast } from "react-toastify";

export default function About() {
  return (
<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        About Nature and Monsoons
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          Nature is a beautiful and complex system that is constantly changing.
          One of the most important factors that affects nature is the monsoon
          season.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Monsoons are seasonal changes in the direction of the prevailing
          winds. They are most often associated with the Indian Ocean. Monsoons
          cause wet and dry seasons throughout much of the tropics.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The monsoon season is a time of great renewal for nature. The rains
          bring life to the plants and animals, and the rivers and lakes are
          replenished. However, the monsoon season can also be a time of
          danger. Floods and landslides can cause widespread damage and
          destruction.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Despite the dangers, the monsoon season is an essential part of the
          natural cycle. It is a time of renewal, growth, and abundance.
        </p>
      </div>
    </div>
  )}