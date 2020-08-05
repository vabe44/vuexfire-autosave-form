/* eslint-disable no-loop-func */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.calculateFormProgress = functions.firestore
    .document('forms/{formId}')
    .onWrite(async (change, context) => {
		// Need to request the current data from db, because
		// Firebase triggers are not always delivered in order
		const doc = await db.collection('forms').doc(context.params.formId).get();
		const currentData = doc.data();
		// Count the non-empty fields
		const fields = Object.keys(currentData).filter(k => currentData[k] !== "").length
		// Form has 5 fields so each counts as 20%
		const progress = fields * 20;
		return db.collection('progress').doc(context.params.formId).set({ progress })
    });
