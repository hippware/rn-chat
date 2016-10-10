//
//  CustomAnnotation.h
//  RCTMapboxGL
//
//  Created by Pavlo Aksonov on 26/09/16.
//  Copyright © 2016 Mapbox. All rights reserved.
//

#import <Mapbox/Mapbox.h>

@interface CustomAnnotation : MGLAnnotationView<MGLAnnotation>

@property (nonatomic, readonly) CLLocationCoordinate2D coordinate;
@property (nonatomic, weak) MGLMapView *map;

@end
