//
//  Shared.h
//  SignAndVerify
//
//  Created by Ricci Adams on 2014-07-20.
//
//

#import <Foundation/Foundation.h>

extern NSData *GetSHA1Hash(NSData *inData);
extern NSData *GetSHA256Hash(NSData *inData);

extern NSString *GetHexStringWithData(NSData *data);
extern NSData   *GetDataWithHexString(NSString *inputString);



@interface Verifier : NSObject

+(BOOL)verifyContent:(NSString *)contentPath publicKeyPath:(NSString*) publicKeyPath signaturePath:(NSString *)signaturePath;

- (id) initWithContentsOfFile:(NSString *)path tag:(NSString *)tag;

- (BOOL) verifySHA1Hash:(NSData *)hash   withSignature:(NSData *)signature;
- (BOOL) verifySHA256Hash:(NSData *)hash withSignature:(NSData *)signature;

@end
