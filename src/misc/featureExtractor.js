import FeatureList from '../assets/jsons/masterStep.json'

export function extractFeatures () {
  const parentFeatures = FeatureList[2].options
  let subFeatureList = []
  for (var i = 0; i < parentFeatures.length - 1; i++) {
    if (parentFeatures[i].options) {
      parentFeatures[i].options?.map(sub => {
        const subFeature = { ...sub }
        subFeature.parent = { ...parentFeatures[i] }
        delete subFeature.parent.options
        subFeatureList.push(subFeature)
      })
    } else {
      subFeatureList.push(parentFeatures[i])
    }
  }
  return {
    parentFeatures: parentFeatures,
    subFeatures: subFeatureList
  }
}

export function extractSubFeatures (parentId) {
  const parentFeature = FeatureList[2].options?.find(x => x.id === parentId)
  const subFeatures = parentFeature?.options
  const parent = { ...parentFeature }
  try {
    delete parent.options
  } catch (ex) {}
  return {
    parent,
    subFeatures
  }
}

export function extractFeature (featureId) {
  return extractFeatures().subFeatures.find(x => x.id == featureId)
}

export function extractFeaturesAsIs () {
  return FeatureList[2].options
}
